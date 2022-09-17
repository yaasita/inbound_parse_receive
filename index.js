"use strict";

const HOST = "example.net";
const PORT = "465";
const FROM = "from@example.net";
const TO = "to@example.net";

const Busboy = require("busboy");
const nodemailer = require("nodemailer");

exports.handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed\n");
  }
  let maildata;
  try {
    maildata = await parse_form_data(req);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Bad Request\n");
  }
  try {
    console.log(maildata);
    await send_mail(maildata);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error\n");
  }
  return res.status(200).send("OK\n");
};

async function parse_form_data(req) {
  const payload = await new Promise((resolv) => {
    const busboy = Busboy({ headers: req.headers });
    let email_field;
    busboy.on("field", (fieldname, val) => {
      if (fieldname === "email") {
        email_field = val;
      }
    });
    busboy.on("finish", () => {
      resolv(email_field);
    });
    busboy.end(req.rawBody);
  });
  if (payload == null) {
    throw new Error("parse error");
  }
  return payload;
}
async function send_mail(eml) {
  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
  });
  await transporter.sendMail({
    envelope: {
      from: FROM,
      to: [TO],
    },
    raw: eml,
  });
}
