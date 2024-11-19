import { cors } from "remix-utils/cors";
import db from '../db.server'

export const loader = async ({ request }) => {
    let app = await db.app.findFirst({
        include: {
          specifications: { 
            select: {
              content: true,
            },
          },
        },
        where:{
            id:1
        }
      });
      
      
    return cors(request, app)
}