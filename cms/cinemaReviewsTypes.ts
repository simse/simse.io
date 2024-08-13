import { defineField, defineType } from "sanity";

export const cinemaBrandType = defineType({
  name: "cinemaBrand",
  title: "Cinema Brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 200,
      },
    }),
  ],
});

export const cinemaType = defineType({
  name: "cinema",
  title: "Cinema",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Cinema name including brand name if any, e.g. ODEON Luxe",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "isIndependent",
      title: "Is Independent",
      type: "boolean",
    }),

    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "cinemaBrand" }],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 200,
      },
    }),
  ],
});

export const cinemaScreenType = defineType({
  name: "cinemaScreen",
  title: "Cinema Screen",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cinema",
      title: "Cinema",
      type: "reference",
      to: [{ type: "cinema" }],
    }),
    defineField({
      name: "videoTechnology",
      title: "Video Technology",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "IMAX", value: "imax" },
          { title: "Dolby Vision", value: "dolbyVision" },
          { title: "Laser", value: "laser" },
          { title: "HDR", value: "hdr" },
        ],
      },
    }),
    defineField({
      name: "audioTechnology",
      title: "Audio Technology",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Dolby Atmos", value: "dolbyAtmos" },
          { title: "Dolby Surround", value: "dolbySurround" },
          { title: "DTS:X", value: "dtsx" },
        ],
      },
    }),
    defineField({
      name: "totalSeats",
      title: "Total Seats",
      type: "number",
    }),
    defineField({
      name: "isAirConditioned",
      title: "Is Air Conditioned?",
      type: "boolean",
    }),
  ],
});

export const cinemaScreenReviewType = defineType({
  name: "cinemaScreenReview",
  title: "Cinema Review",
  type: "document",
  fields: [
    defineField({
      name: "cinemaScreen",
      title: "Cinema Screen",
      type: "reference",
      to: [{ type: "cinemaScreen" }],
    }),
    defineField({
      name: "movie",
      title: "Movie",
      type: "string",
    }),
    defineField({
      name: "seat",
      title: "Seat",
      type: "string",
    }),
    defineField({
      name: "pricePaid",
      title: "Price Paid",
      type: "number",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "pictureSharpness",
      title: "Picture Sharpness",
      type: "number",
    }),
    defineField({
      name: "pictureContrast",
      title: "Picture Contrast",
      type: "number",
    }),
    defineField({
      name: "pictureColour",
      title: "Picture Colour",
      type: "number",
    }),
    defineField({
      name: "pictureClarity",
      title: "Picture Clarity",
      type: "number",
    }),
    defineField({
      name: "audioClarity",
      title: "Audio Clarity",
      type: "number",
    }),
    defineField({
      name: "audioLowEnd",
      title: "Audio Low-end",
      type: "number",
    }),
    defineField({
      name: "audioSurround",
      title: "Audio Surround",
      type: "number",
    }),
    defineField({
      name: "audioPleasantness",
      title: "Audio Pleasantness",
      type: "number",
    }),
    defineField({
      name: "seatComfort",
      title: "Seat Comfort",
      type: "number",
    }),
    defineField({
      name: "seatPrivacy",
      title: "Seat Privacy",
      type: "number",
    }),
    defineField({
      name: "seatView",
      title: "Seat View",
      type: "number",
    }),
  ],
});
