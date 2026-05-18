import { kommentarRepository } from '../repositories/kommentarRepository';

export class KommentarService {

  // 👉 Kommentar erstellen
  static async create(input: {
    text: string;
    userId: string;
    ortId: string;
  }) {

    if (!input.text.trim()) {
      throw new Error('Kommentar darf nicht leer sein');
    }

    return kommentarRepository.create({
      text: input.text,
      userId: input.userId,
      ortId: input.ortId
    });
  }

  // 👉 Kommentare für Ort laden
  static async getByOrtId(ortId: string) {
    return kommentarRepository.findByOrtId(ortId);
  }

}