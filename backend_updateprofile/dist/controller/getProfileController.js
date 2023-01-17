"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("@google-cloud/datastore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
const datastore = new datastore_1.Datastore();
const kindUserProfile = process.env.KIND_USER_PROFILE || "userprofile";
function getProfileController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userProfile = req.authData;
        const email = userProfile.decode.email;
        const tenan = userProfile.decode.tenan;
        if (email && tenan) {
            const query = datastore.createQuery(kindUserProfile)
                .select([
                "birthday",
                "dealbreaker",
                "exisiting_silution",
                "family",
                "firstname",
                "gender",
                "hobby",
                "job_level",
                "lastname",
                "mh_goal",
                "peiod",
                "personality_type",
                "sector",
                "stree_level",
                "working_nature"
            ])
                .filter("email", "=", email)
                .limit(1);
            try {
                const [taskProfile] = yield datastore.runQuery(query);
                const replyData = {
                    status: 200,
                    data: taskProfile
                };
                res.send(replyData);
            }
            catch (err) {
                const replyData = {
                    status: 500,
                    data: err
                };
                res.send(replyData);
            }
        }
        else {
            const replyData = {
                status: 403,
                text: "unauthorized"
            };
            res.send(replyData);
        }
    });
}
exports.default = getProfileController;
