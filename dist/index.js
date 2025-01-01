"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Entrix API",
            version: '1.0.0',
            description: 'A event management API'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ["./routes/*.js"]
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.get("/", (req, res) => {
    res.send("hello");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log("server is serving");
});
