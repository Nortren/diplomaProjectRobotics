import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
export default class BusinessLogic {

    /**
     * Запрос на бизнес логику для получения данных и построения по ним графиков
     * @param interval частота обращения на БЛ
     * @param data данные для отправки на сервер
     */

    getBlGraphsData(interval, data, callback) {
        socket.emit('setGraphsData', interval, data);
        socket.on('getGraphsData', (data) => {
            callback(data);
        });
    }

    /**
     * Запрос на бизнес логику для получения данных и построения по ним графиков
     * @param interval частота обращения на БЛ
     * @param data данные для отправки на сервер
     */

    getBlChartData(interval, data, callback) {
        socket.emit('setChartData', interval, data);
        socket.on('getChartData', (data) => {
            callback(data);
        });
    }

}
