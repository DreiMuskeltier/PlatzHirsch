type CreateOrtVorschlagInput = {
  name: string;
  beschreibung: string;
  lat: number;
  lng: number;
  userId: string;
  originalOrtId?: string;
};

export class OrtVorschlagFactory {
  static create(input: CreateOrtVorschlagInput) {
    return {
      name: input.name,
      beschreibung: input.beschreibung,
      lat: input.lat,
      lng: input.lng,
      status: "BEANTRAGT",
      createdById: input.userId,
      originalOrtId: input.originalOrtId ?? null
    };
  }
}