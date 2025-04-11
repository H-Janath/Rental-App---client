import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async(headers)=>{
      const session  = await fetchAuthSession();
      const {idToken} = session.tokens ?? {};
      if(idToken){
        headers.set("Authorization", `Bearer ${idToken}`)
      }
      return headers;
    }
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser : build.query<User,void>({
      queryFn: async(_,_queryApi,_extraptions,fetchWithBQ)=>{
        try {
          const session = await fetchAuthSession();
          const {idToken} = session.tokens?? {};
          const user = await getCurrentUser();
          const userRole = idToken?.payload["custom:role"] as string;
          
          console.log("userRole")
          
          const endpoint = 
            userRole === "manager"?
            `/managers/${user.userId}`
            : `/tenants/${user.userId}`;

          let userDetailsReponse = await fetchWithBQ(endpoint);
      
          if(userDetailsReponse.error &&
            userDetailsReponse.error.status ===404
          ){

            userDetailsReponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ
            )
          }

          //if user dosne't exit, create new user
          return {
            data:{
              cognitoInfo:{...user},
              userInfo: userDetailsReponse.data as Tenant | Manager,
              userRole
            }
          }
        } catch (error : any) {
          return {error: error.message || "Could not fetch user data"}
        }
      }
    })
  }),
});

export const {
  useGetAuthUserQuery,
} = api;
