/* __next_internal_action_entry_do_not_use__ {"7f6a88810ecce4a4e8b59d53b8327d7e98bbf251d7":"$$RSC_SERVER_ACTION_0","7f90b5db271335765a4b0eab01f044b381b5ebd5cd":"$$RSC_SERVER_ACTION_1"} */ import { registerServerReference } from "private-next-rsc-server-reference";
import { encryptActionBoundArgs, decryptActionBoundArgs } from "private-next-rsc-action-encryption";
<<<<<<< HEAD
var myAction = registerServerReference($$RSC_SERVER_ACTION_0, "706a88810ecce4a4e8b59d53b8327d7e98bbf251d7", null);
export async function $$RSC_SERVER_ACTION_0(a, b, c) {
=======
export const $$RSC_SERVER_ACTION_0 = async function myAction(a, b, c) {
>>>>>>> canary
    console.log('a');
};
var myAction = registerServerReference($$RSC_SERVER_ACTION_0, "6a88810ecce4a4e8b59d53b8327d7e98bbf251d7", null);
export default function Page() {
    return <Button action={myAction}>Delete</Button>;
}
<<<<<<< HEAD
export const action = withValidate(registerServerReference($$RSC_SERVER_ACTION_1, "0090b5db271335765a4b0eab01f044b381b5ebd5cd", null));
export async function $$RSC_SERVER_ACTION_1() {}
=======
export const $$RSC_SERVER_ACTION_1 = async function() {};
// TODO: should use `action` as function name?
export const action = withValidate(registerServerReference($$RSC_SERVER_ACTION_1, "90b5db271335765a4b0eab01f044b381b5ebd5cd", null));
>>>>>>> canary
