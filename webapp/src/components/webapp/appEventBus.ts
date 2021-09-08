import mitt from 'mitt';
const EventBus = mitt();

export default EventBus;

export enum Events{
    openForm = "openForm",
    closeForm = "closeForm"
}