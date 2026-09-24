"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramMailingServiceError = void 0;
class TelegramMailingServiceError extends Error {
    isTelegramMailingServiceError = true;
    sdk = 'TelegramMailingService';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TelegramMailingServiceError = TelegramMailingServiceError;
//# sourceMappingURL=TelegramMailingServiceError.js.map