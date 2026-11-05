# ZS BIT – strona www

Nowa wersja [zsbit.pl](https://zsbit.pl): Astro, statyczny build, deploy na Netlify.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

Wymaga Node ≥ 22.23.4 (Netlify: `NODE_VERSION = 24` w `netlify.toml`).

## Treści

Każda edycja to jeden plik w `src/content/editions/*.yaml`. Schemat (walidowany przy buildzie) jest w `src/content.config.ts`.

```yaml
number: 19                 # numer binarny (10011) liczy się sam
name: "Nazwa edycji"
date: 2027-03-15T17:00:00+01:00
banner: /img/editions/10011.png
venue: { name: "Klub Hormon", address: "Monte Cassino 6, Szczecin" }
registrationUrl: "https://..."
hosts: ["Imię Nazwisko"]
talks:
  - { speaker: "Imię Nazwisko", title: "Tytuł", kind: talk }   # talk | lightning | panel
sponsors: ["Firma"]
partners: ["Firma"]
```

## Status: prototyp kierunków wizualnych

Strona główna to na razie **prototyp** z trzema wariantami wyglądu:

- `?variant=A`: Noc (ciemny, kinowy, kontynuacja banerów edycji)
- `?variant=B`: Changelog (jasny, monospace, archiwum jako `git log` z wyszukiwarką)
- `?variant=C`: Bento (kafle z akcjami, ściana prelegentów, siatka plakatów)

oraz dwoma stanami: `?state=upcoming` (edycja zapowiedziana) i `?state=between` (przerwa między edycjami).
Przełączanie: pasek na dole ekranu albo strzałki ← →. Formularze jeszcze nic nie wysyłają, a liczba wolnych miejsc to dane przykładowe.

Po wyborze kierunku: zwycięski wariant zostanie przepisany porządnie, a prototyp przeniesiony na gałąź `prototype/visual-directions`.

## Plan

1. **Redesign + migracja treści** (w toku)
2. **Newsletter** (zewnętrzny dostawca z double opt-in) i **CFP** (formularz → baza → powiadomienie). RODO + anty-spam.
3. **Własna rejestracja** na bezpłatne wydarzenie: limit miejsc, potwierdzenie z QR, lista rezerwowa, rezygnacje, check-in. Do tego czasu Eventbrite.
