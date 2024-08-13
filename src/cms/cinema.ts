import { q } from "groqd";
import { sanityClient } from "sanity:client";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import {getImageBuilder} from "./index.ts";

interface Cinema {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  website: string;
  isIndependent: boolean;
  slug: string;
  brand: CinemaBrand;
  screens?: CinemaScreen[];
}

interface CinemaWithScreens extends Cinema {
  screens: CinemaScreen[];
}

interface CinemaBrand {
  id: string;
  name: string;
  logo: {
    asset: SanityAsset;
    sizes: {
      small: string;
    }
  };
  slug: string;
}

interface CinemaScreen {
  id: string;
  name: string;
  videoTechnology: string[],
  audioTechnology: string[],
  totalSeats: number | null;
  isAirConditioned: boolean;
  reviews: CinemaScreenReview[];
}

interface CinemaScreenReview {
  id: string;
  movie: string;
  seat: string;
  pricePaid: number;
  date: Date;
  pictureSharpness: number;
  pictureContrast: number;
  pictureColour: number;
  pictureClarity: number;
  audioClarity: number;
  audioLowEnd: number;
  audioSurround: number;
  audioPleasantness: number;
  seatComfort: number;
  seatPrivacy: number;
  seatView: number;
}

export const getAllCinemas = async (): Promise<Cinema[]> => {
  const { query, schema } = q("*")
    .filter("_type == 'cinema'")
    .grab({
      _id: q.string(),
      name: q.string(),
      address: q.string(),
      location: q.object({
        lat: q.number(),
        lng: q.number(),
      }),
      website: q.string(),
      isIndependent: q.boolean(),
      brand: q("*")
        .filter("_type == 'cinemaBrand' && _id == ^.brand._ref")
        .grab({
          _id: q.string(),
          name: q.string(),
          logo: q.object({
            _type: q.string(),
            asset: q.object({
              _ref: q.string(),
              _type: q.string(),
            }),
          }),
          slug: q.object({
            current: q.string(),
            _type: q.string(),
          }),
        }),
      slug: q.object({
        current: q.string(),
        _type: q.string(),
      }),
    });

  const response = schema.parse(await sanityClient.fetch(query));

  return response.map((sanityCinema) => ({
    ...sanityCinema,
    slug: sanityCinema.slug.current,
    id: sanityCinema._id,
    location: {
      latitude: sanityCinema.location.lat,
      longitude: sanityCinema.location.lng,
    },
    brand: {
      ...sanityCinema.brand[0],
      id: sanityCinema.brand[0]._id,
      slug: sanityCinema.brand[0].slug.current,
      logo: {
        ...sanityCinema.brand[0].logo,
        sizes: {
          small: getImageBuilder(sanityCinema.brand[0].logo.asset).width(100).height(100).format('webp').url(),
        }
      },
    },
  }));
};

export const getCinemaScreensBySlug = async (slug: string): Promise<CinemaWithScreens | undefined> => {
  const { query, schema } = q("*")
    .filter("_type == 'cinema' && slug.current == $slug")
    .grab({
      _id: q.string(),
      name: q.string(),
      address: q.string(),
      location: q.object({
        lat: q.number(),
        lng: q.number()
      }),
      website: q.string(),
      isIndependent: q.boolean(),
      brand: q("*")
        .filter("_type == 'cinemaBrand' && _id == ^.brand._ref")
        .grab({
          _id: q.string(),
          name: q.string(),
          logo: q.object({
            _type: q.string(),
            asset: q.object({
              _ref: q.string(),
              _type: q.string()
            })
          }),
          slug: q.object({
            current: q.string(),
            _type: q.string()
          })
        }),
      slug: q.object({
        current: q.string(),
        _type: q.string()
      }),
      screens: q("*")
        .filter("_type == 'cinemaScreen' && cinema._ref == ^._id")
        .grab({
          _id: q.string(),
          name: q.string(),
          videoTechnology: q.array(q.string()),
          audioTechnology: q.array(q.string()),
          totalSeats: q.number().nullable(),
          isAirConditioned: q.boolean(),
          reviews: q("*")
            .filter("_type == 'cinemaScreenReview' && cinemaScreen._ref == ^._id")
            .grab({
              _id: q.string(),
              movie: q.string(),
              seat: q.string(),
              pricePaid: q.number(),
              date: q.date(),
              pictureSharpness: q.number(),
              pictureContrast: q.number(),
              pictureColour: q.number(),
              pictureClarity: q.number(),
              audioClarity: q.number(),
              audioLowEnd: q.number(),
              audioSurround: q.number(),
              audioPleasantness: q.number(),
              seatComfort: q.number(),
              seatPrivacy: q.number(),
              seatView: q.number()
            })
        })
    });

  const response = schema.parse(await sanityClient.fetch(query, { slug }));
  if (response.length < 1) {
    return undefined;
  }

  const sanityCinema = response[0];

  return {
    ...sanityCinema,
    slug: sanityCinema.slug.current,
    id: sanityCinema._id,
    location: {
      latitude: sanityCinema.location.lat,
      longitude: sanityCinema.location.lng,
    },
    brand: {
      ...sanityCinema.brand[0],
      id: sanityCinema.brand[0]._id,
      slug: sanityCinema.brand[0].slug.current,
      logo: {
        ...sanityCinema.brand[0].logo,
        sizes: {
          small: getImageBuilder(sanityCinema.brand[0].logo.asset).width(100).height(100).format('webp').url(),
        }
      },
    },
    screens: sanityCinema.screens.map(screen => ({
      ...screen,
      id: screen._id,
      reviews: screen.reviews.map(review => ({
        ...review,
        id: review._id
      }))
    }))
  }
}