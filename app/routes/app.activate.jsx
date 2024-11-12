  import { cors } from 'remix-utils/cors';
  
  export const loader = async ({ request }) => {
   
    console.log(request)
    
    return cors(request, {});
  };