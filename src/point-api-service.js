import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class PointApiService extends ApiService {

  get destinations(){
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers(){
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'date_from': point.startTime instanceof Date ? point.startTime.toISOString() : null,
      'date_to': point.endTime instanceof Date ? point.endTime.toISOString() : null,
      'is_favorite': point.isFavorite,
      'destination': point.name,
      'base_price': point.price
    };


    delete adaptedPoint.startTime;
    delete adaptedPoint.endTime;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.price;
    delete adaptedPoint.checkedOffers;
    delete adaptedPoint.allOffers;
    delete adaptedPoint.allPoints;
    delete adaptedPoint.destinationInfo;
    delete adaptedPoint.name;
    delete adaptedPoint.allDestinations;
    delete adaptedPoint.allTypes;

    return adaptedPoint;
  }
}
