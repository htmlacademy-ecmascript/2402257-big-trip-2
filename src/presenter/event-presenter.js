import AddPointView from '../view/add-event-point-view';
import EditPointView from '../view/edit-event-point-view';
import EventListView from '../view/event-list-view';
import EventPointView from '../view/event-point-view';
import { render } from '../render.js';

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.eventListComponent, this.listContainer);
    render(new EditPointView(), this.eventListComponent.getElement());
    render(new AddPointView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventPointView(), this.eventListComponent.getElement());
    }
  }
}
