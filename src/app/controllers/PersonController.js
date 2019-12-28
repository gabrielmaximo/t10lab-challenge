/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import Address from '../models/Adress';
import Person from '../models/Person';

class PersonController {
  async index(req, res) {
    /** Procura pessoas cadastradas pelo user e retorna os dados junto com a relação de endereços */
    const people = await Person.find({ user: req.userId }).populate('address');

    return res.json(people);
  }

  async store(req, res) {
    // eslint-disable-next-line prefer-const
    const { first_name, last_name, cpf } = req.body;
    let { local_name, address } = req.body;

    /** Verifica se esta pessoa ja esta cadastrada */
    const personExists = await Person.findOne({ cpf });
    if (personExists) {
      return res
        .status(400)
        .json({ error: 'This person already been registered!' });
    }

    /** Retira acentos para evitar conflito com a API do google */
    local_name = local_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    address = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /** Chamada a api do google para busca de lugares baseado no endereço e/ou nome do local */
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address},${local_name}&inputtype=textquery&language=pt-BR&fields=formatted_address,name,geometry&key=${process.env.GMAPS_KEY}`
    );

    try {
      const { formatted_address, geometry, name } = data.candidates[0];

      /** Criando endereço baseado no response.data da API do Gmaps */
      const { _id: addressId } = await Address.create({
        address: formatted_address,
        geo_location: { ...geometry.location },
        local_name: name,
      });

      /** Cria uma pessoa ja contendo o endereço e cordenadas geograficas (lat / long) */
      const person = await Person.create({
        user: req.userId,
        address: addressId,
        first_name,
        last_name,
        cpf,
      });

      return res.status(201).json(person);
    } catch (error) {
      return res.status(400).json({
        error: 'Address not found or incorrect formatted',
        example: 'Av. Cesar Finotti, 305 - Jardim Finotti, Uberlândia - MG',
      });
    }
  }

  async update(req, res) {
    /** Procura e edita a pessoa baseado no ID */
    const person = await Person.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      req.body,
      { new: true }
    );

    if (!person) {
      return res.status(404).json({ error: 'This person does not exists!' });
    }

    return res.json(person);
  }

  async delete(req, res) {
    /** Deleta uma pessoa que o user cadastrou */
    const person = await Person.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!person) {
      return res.status(404).json({
        error: 'This person does not exists or already been deleted.',
      });
    }

    return res.json(person);
  }
}

export default new PersonController();
