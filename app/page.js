"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const count_down_1 = __importDefault(require("@/components/count-down"));
function Home() {
    return (<div>
            <count_down_1.default />
        </div>);
}
exports.default = Home;
