/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */

import { z } from "zod";

import { PaymentMethodEnum } from "@/core/domain/enums/PaymentMethodEnum";
import { PaymentStatusEnum } from "@/core/domain/enums/PaymentStatusEnum";

import { tag } from "./constants";

const orderComboSchema = z.object({
  sandwichId: z.string().optional(),
  sideId: z.string().optional(),
  drinkId: z.string().optional(),
  dessertId: z.string().optional(),
  annotation: z.string().optional(),
  quantity: z.number(),
});

export const createOrderPayloadSchema = z.object({
  visitorName: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethodEnum),
  paymentDetails: z.string().optional(),
  combos: z.array(orderComboSchema),
});

export const createOrderDocSchema = {
  description: `Create ${tag}`,
  tags: [tag],
  body: {
    type: "object",
    properties: {
      visitorName: {
        type: "string",
        description:
          "This field is used for users who do not want to identify themselves.",
      },
      paymentMethod: {
        type: "string",
        enum: Object.values(PaymentMethodEnum),
      },
      paymentStatus: {
        type: "string",
        enum: Object.values(PaymentStatusEnum),
      },
      paymentDetails: {
        type: "string",
        description: "This field is used for payment details.",
      },
      combos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            sandwichId: { type: "string" },
            sideId: { type: "string" },
            drinkId: { type: "string" },
            dessertId: { type: "string" },
            quantity: { type: "number" },
            annotation: { type: "string" },
          },
        },
      },
    },
  },
};
