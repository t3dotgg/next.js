<<<<<<< HEAD
// This is for testing the "information byte" of Server Action / Cache IDs.
// Should be 1 110000 0, which is "e0" in hex.
/* __next_internal_action_entry_do_not_use__ {"7f3128060c414d59f8552e4788b846c0d2b7f74743":"$$RSC_SERVER_CACHE_0","7f471a5eb0be1c31686dd4ba938a80328b80b1615d":"$$RSC_SERVER_CACHE_5","7f69348c79fce073bae2f70f139565a2fda1c74c74":"$$RSC_SERVER_CACHE_2","7f90b5db271335765a4b0eab01f044b381b5ebd5cd":"$$RSC_SERVER_ACTION_1","7f9ed0cc47abc4e1c64320cf42b74ae60b58c40f00":"$$RSC_SERVER_ACTION_3","7fa9b2939c1f39073a6bed227fd20233064c8b7869":"$$RSC_SERVER_ACTION_4"} */ import { registerServerReference } from "private-next-rsc-server-reference";
import { encryptActionBoundArgs, decryptActionBoundArgs } from "private-next-rsc-action-encryption";
import { cache as $$cache__ } from "private-next-rsc-cache-wrapper";
export var $$RSC_SERVER_CACHE_0 = $$cache__("default", "e03128060c414d59f8552e4788b846c0d2b7f74743", async function f1(a, b) {
    return [
        a,
        b
    ];
});
var f1 = registerServerReference($$RSC_SERVER_CACHE_0, "e03128060c414d59f8552e4788b846c0d2b7f74743", null);
var f2 = // Should be 0 110000 1, which is "60" in hex.
registerServerReference($$RSC_SERVER_ACTION_1, "6090b5db271335765a4b0eab01f044b381b5ebd5cd", null);
export async function $$RSC_SERVER_ACTION_1(a, b) {
    return [
        a,
        b
    ];
}
export var $$RSC_SERVER_CACHE_2 = $$cache__("default", "ff69348c79fce073bae2f70f139565a2fda1c74c74", // Should be 1 111111 1, which is "ff" in hex.
async function f3(a, b, ...rest) {
    return [
        a,
        b,
        rest
    ];
});
var f3 = registerServerReference($$RSC_SERVER_CACHE_2, "ff69348c79fce073bae2f70f139565a2fda1c74c74", null);
var f4 = // Should be 0 111110 0, which is "7c" in hex.
registerServerReference($$RSC_SERVER_ACTION_3, "7c9ed0cc47abc4e1c64320cf42b74ae60b58c40f00", null);
export async function $$RSC_SERVER_ACTION_3(a, b, c, d, e) {
    return [
        a,
        b,
        c,
        d,
        e
    ];
}
var f4 = // Should be 0 111111 0, which is "7e" in hex.
registerServerReference($$RSC_SERVER_ACTION_4, "7ea9b2939c1f39073a6bed227fd20233064c8b7869", null);
export async function $$RSC_SERVER_ACTION_4(a, b, c, d, e, f) {
    return [
        a,
        b,
        c,
        d,
        e,
        f
    ];
}
export var $$RSC_SERVER_CACHE_5 = $$cache__("default", "ff471a5eb0be1c31686dd4ba938a80328b80b1615d", // Should be 1 111111 1, which is "ff" in hex.
async function f5(a, b, c, d, e, f, g) {
    return [
        a,
        b,
        c,
        d,
        e,
        f,
        g
    ];
});
var f5 = registerServerReference($$RSC_SERVER_CACHE_5, "ff471a5eb0be1c31686dd4ba938a80328b80b1615d", null);
=======
/* __next_internal_action_entry_do_not_use__ {"1c36b06e398c97abe5d5d7ae8c672bfddf4e1b91":"$$RSC_SERVER_ACTION_2","6a88810ecce4a4e8b59d53b8327d7e98bbf251d7":"$$RSC_SERVER_ACTION_0","90b5db271335765a4b0eab01f044b381b5ebd5cd":"$$RSC_SERVER_ACTION_1","9ed0cc47abc4e1c64320cf42b74ae60b58c40f00":"$$RSC_SERVER_ACTION_3","a9b2939c1f39073a6bed227fd20233064c8b7869":"$$RSC_SERVER_ACTION_4"} */ import { registerServerReference } from "private-next-rsc-server-reference";
import { encryptActionBoundArgs, decryptActionBoundArgs } from "private-next-rsc-action-encryption";
import { Form } from './form';
export const $$RSC_SERVER_ACTION_0 = async function foo() {
    return 'declarator arrow function expression';
};
export const $$RSC_SERVER_ACTION_1 = async function bar() {
    return 'function declaration';
};
export const $$RSC_SERVER_ACTION_2 = async function action() {
    return 'arrow function expression';
};
export const $$RSC_SERVER_ACTION_3 = async function action() {
    return 'anonymous function expression';
};
export const $$RSC_SERVER_ACTION_4 = async function baz() {
    return 'named function expression';
};
export default function Page() {
    const foo = registerServerReference($$RSC_SERVER_ACTION_0, "6a88810ecce4a4e8b59d53b8327d7e98bbf251d7", null);
    var bar = registerServerReference($$RSC_SERVER_ACTION_1, "90b5db271335765a4b0eab01f044b381b5ebd5cd", null);
    return <>
      <Form action={foo}/>
      <Form action={bar}/>
      <Form action={registerServerReference($$RSC_SERVER_ACTION_2, "1c36b06e398c97abe5d5d7ae8c672bfddf4e1b91", null)}/>
      <Form action={registerServerReference($$RSC_SERVER_ACTION_3, "9ed0cc47abc4e1c64320cf42b74ae60b58c40f00", null)}/>
      <Form action={registerServerReference($$RSC_SERVER_ACTION_4, "a9b2939c1f39073a6bed227fd20233064c8b7869", null)}/>
    </>;
}
>>>>>>> canary
