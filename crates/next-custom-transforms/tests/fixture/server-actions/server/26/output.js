/* __next_internal_action_entry_do_not_use__ {"7f6a88810ecce4a4e8b59d53b8327d7e98bbf251d7":"$$RSC_SERVER_ACTION_0"} */ import { registerServerReference } from "private-next-rsc-server-reference";
import { encryptActionBoundArgs, decryptActionBoundArgs } from "private-next-rsc-action-encryption";
const noop = (action)=>action;
<<<<<<< HEAD
export const log = noop(registerServerReference($$RSC_SERVER_ACTION_0, "406a88810ecce4a4e8b59d53b8327d7e98bbf251d7", null));
export async function $$RSC_SERVER_ACTION_0(data) {
=======
export const $$RSC_SERVER_ACTION_0 = async function(data) {
>>>>>>> canary
    console.log(data);
};
// TODO: should use `log` as function name?
export const log = noop(registerServerReference($$RSC_SERVER_ACTION_0, "6a88810ecce4a4e8b59d53b8327d7e98bbf251d7", null));
