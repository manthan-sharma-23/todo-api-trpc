import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";


const trpc=createTRPCProxyClient<AppRouter>({
    links:[
        httpBatchLink({
            url:"http://localhost:3000"
        })
    ]
});

async function main(){
    let response=await trpc.createUser.mutate({
        name:"Manthan",
        email:"manthan23@gmail.com",
        password:"manthan@1233"
    })

    console.log(response);
}

main();