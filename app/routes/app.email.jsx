import { cors } from 'remix-utils/cors';
import { transporter } from '../utils/helper';
import db from '../db.server';
import { json } from '@remix-run/node';

export async function loader({ request }) {
  if (request.method === "OPTIONS") {
    const response = json({
      status: 200,
    });
    return await cors(request, response);
  }
}

export const action = async ({ request }) => {
    let response;
  if (request.method === "OPTIONS") {
    const response = json({
      status: 200,
    });
    return await cors(request, response);
  }
  const data = await request.json();
  const emailCoupon = await db.announcement_bar.findFirst({
    where:{
        shop: data.shop,
        type: '5',
        status: true
    }
  })
  emailCoupon.general_setting = JSON.parse(emailCoupon.general_setting)
  console.log(emailCoupon)
  const shopName = (data.shop).replace('.myshopify.com', '');
  const mailOptions = {
    from: 'deepak.aggarwal@chicmicstudios.in',
    to: data.email,
    subject: `🎉Welcome to ${shopName}! 🎉 Your Free Promo Code Awaits!`,
    html: `<p>Hi 👋<br><br>Welcome to the ${shopName} family! We’re so excited to have you on board. To kickstart your journey with us, here’s a FREE promo code to use on your next purchase: ${emailCoupon.general_setting.coupon}.
          <br><br>With your new promo code, you’re one step closer to enjoying all the amazing products we offer. Start exploring today and take full advantage of everything we’ve got in store!
          <br><br>If you need any help or have questions, don’t hesitate to reach out. We’re here for you.<br><br>Cheers,<br><br>The ${shopName} Team</p>`, 
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });  
  response = json({ message: (emailCoupon.general_setting.couponText.replace('#coupon#', emailCoupon.general_setting.coupon)), success: true });
  return cors(request, response, { methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"] });
};