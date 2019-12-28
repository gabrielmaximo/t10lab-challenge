/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import Person from '../models/Person';
import Address from '../models/Adress';

class AddressController {
  async index(req, res) {
    const addresses = await Address.find();

    return res.json(addresses);
  }

  async update(req, res) {
    // eslint-disable-next-line prefer-const
    let { local_name, address } = req.body;

    /** Busca e verifica se a pessoa não existe */
    const person = await Person.findById(req.params.personId);
    if (!person) {
      return res.status(404).json({ error: 'This person does not exists!' });
    }

    /** Verifica a permissão do user, pois só podem editar endereços de pessoas que eles cadastraram */
    if (person.user != req.userId) {
      return res
        .status(400)
        .json({ error: 'You dont have permission to edit this person.' });
    }

    /** Retira acentos do endereço para evitar conflito com a API do google */
    local_name = local_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    address = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /** Chamada a api do google para busca de lugares baseado no endereço e/ou nome do local */
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address},${local_name}&inputtype=textquery&language=pt-BR&fields=formatted_address,name,geometry&key=${process.env.GMAPS_KEY}`
    );

    /** Verifica se o endereço existe no banco de dados da google, ou seja, se ele é válido */
    if (!data.candidates) {
      return res.status(400).json({ error: 'Invalid Address!' });
    }
    const { formatted_address, geometry, name } = data.candidates[0];

    /** Busca e edita o endereço da pessoa, baseado no id */
    const response = await Address.findByIdAndUpdate(
      person.address,
      {
        address: formatted_address,
        geo_location: { ...geometry.location },
        local_name: name,
      },
      { new: true }
    );

    return res.json(response);
  }

  async delete(req, res) {
    /** Busca pela pessoa a ter o endereço deletado e verifica se ela existe */
    const person = await Person.findById(req.params.personId);
    if (!person) {
      return res.status(404).json({ error: 'Person does not exists!' });
    }

    /** Verifica se o usuário tem permissão para deletar esse endereço */
    if (person.user != req.userId) {
      return res
        .status(401)
        .json({ error: 'You dont have permission to delete this address.' });
    }

    /** Deleta o endereço de uma pessoa que o user logado cadastrou */
    const address = await Address.findOneAndDelete({
      _id: person.address,
    });

    if (!address) {
      return res.status(400).json({
        error: 'This address does not exists or already been deleted.',
      });
    }

    return res.json(address);
  }
}

export default new AddressController();
