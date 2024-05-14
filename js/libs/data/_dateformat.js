// const Time = (props) => {
//     const hours = Number(new Date(props).getHours()) < 10 ? '0' + new Date(props).getHours().toString() : new Date(props).getHours().toString()
//     const minutes = Number(new Date(props).getMinutes()) < 10 ? '0' + new Date(props).getMinutes().toString() : new Date(props).getMinutes().toString()
//     return `${hours}:${minutes}`
// }

const DateTime = (props) => {
    if (props !== undefined && props?.toString().length === 29) {
        const TIME_ZONE = 9 * 60 * 60 * 1000 // 9시간
        const date = new Date(props);
        return new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
    } else {
        return ''
    }
}

const Dateformat = (props) => {
    if (props !== undefined && props?.toString().length === 29) {
        const TIME_ZONE = 9 * 60 * 60 * 1000 // 9시간
        const date = new Date(props);
        return new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5).split(" ")[0];
    } else {
        return ''
    }
}

const Timeformat = (props) => {
    if (props !== undefined && props?.toString().length === 29) {
        const TIME_ZONE = 9 * 60 * 60 * 1000 // 9시간
        const date = new Date(props);
        return new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5).split(" ")[1];
    } else {
        return ''
    }
}

export { DateTime, Dateformat, Timeformat }