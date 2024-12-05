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
  const mailOptions = {
    from: 'deepak.aggarwal@chicmicstudios.in',
    to: data.email,
    subject: 'Email Capture',
    html: `<p>Hello, your coupon code is ${emailCoupon.general_setting.coupon}</p>`, 
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });  
  
  response = json({ message: (emailCoupon.general_setting.couponText.replace('#coupon#', emailCoupon.general_setting.coupon)), success: true });
  return  response;
};