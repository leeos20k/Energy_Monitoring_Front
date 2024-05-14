import { Message } from './_message';

const Status = {
    DEFAULT: {
        code: 0,
        message: Message.S03_M_000001
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: Message.S03_M_000002
    },
    NOT_FOUND: {
        code: 404,
        message: Message.S03_M_000003,
    },
};

export { Status };