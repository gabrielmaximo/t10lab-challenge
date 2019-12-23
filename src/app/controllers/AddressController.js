import axios from 'axios';

// Models
import Address from '../models/Adress';

class AddressController {
  async store(req, res) {
    let { address, local_name } = req.body;

    /** Retira acentos para evitar conflito com a API do google */
    local_name = local_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    address = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    try {
      /** Chamada a api do google para busca de lugares baseado no endereço e/ou nome do local */
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address},${local_name}&inputtype=textquery&language=pt-BR&fields=photos,formatted_address,name,geometry&key=${process.env.GMAPS_KEY}`
      );

      /** Setando variaveis para criação de endereço do usuário baseado no response da API do Gmaps */
      const { formatted_address, geometry, name, photos } = data.candidates[0];
      const response = await Address.create({
        user: req.userId,
        address: formatted_address,
        geo_location: { ...geometry.location },
        local_name: name,
        image: {
          height: photos[0].height,
          width: photos[0].width,
          path: photos[0].photo_reference,
        },
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: 'Address or local name invalid!' });
    }
  }
}

export default new AddressController();
