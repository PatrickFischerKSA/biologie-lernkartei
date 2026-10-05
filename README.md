# Biologie zum Wenden

171 umdrehbare Lernkarten zu den sieben Lernzielen aus `IMG_6967.pdf`: Vielfalt, Lebensmerkmale, Ursprung des Lebens, Strukturstufen, biologische Fachgebiete, wissenschaftliches Arbeiten und zwölf Organsysteme.

**[Lernkartei öffnen](https://patrickfischerksa.github.io/biologie-lernkartei/)** · **[Hörvariante](https://patrickfischerksa.github.io/biologie-lernkartei/?vorlesen=1)**

## Lernen

- Basis (83 Karten), Vertieft (138 inklusive Basis) und Profi (alle 171).
- Fragen vorne, verständliche Modellantworten und Quellen hinten. Quellenpräzisierungen sind markiert.
- Themen, Lernziele, Suchfunktion, Bewertungen und Tastaturbedienung.
- Spielrunden mit bis zu zehn Karten, XP, Serienbonus und erneuter Vorlage unsicherer Karten.
- Repetition nach 1, 3, 7, 14 und 30 Tagen; unsichere Karten sofort fällig.
- Fragen vorlesen, beliebig wiederholen und Tempo wählen.
- Mündlich antworten (Deutsch/Deutsch Schweiz), Erkennungsalternativen auswählen, Text korrigieren oder tippen.
- Fachbegriffe und explizite Synonyme lokal abgleichen. Keine automatische Wahrheitsprüfung oder Benotung.

## Lernstand sichern

Bewertungen, XP, abgeschlossene Runden, Niveau und Wiederholungstermine werden automatisch in localStorage und – wenn verfügbar – zusätzlich IndexedDB gespeichert. Bis zu 20 lokale Sicherungsstände erlauben Wiederherstellung. Der Biologie-Speicher ist von Geschichte und Geografie getrennt.

Unter **Lernstand sichern & wiederherstellen** lässt sich eine JSON-Backup-Datei herunterladen und auf einem anderen Gerät importieren. Ein Import verlangt eine Bestätigung. «Dauerhaften Speicher anfragen» bittet den Browser um Schutz vor automatischer Bereinigung. Browserdaten können trotzdem manuell gelöscht werden: Eine externe Backup-Datei ist für diesen Fall nötig. Es gibt keine automatische Gerätesynchronisierung und kein Konto.

Sprachaufnahmen und Antworttexte werden von dieser App nicht gespeichert oder exportiert. Die optionale Browser-Spracherkennung kann Audio an einen externen Sprachdienst senden. Mikrofon und Vorlesen starten erst durch einen Klick; Unterstützung hängt vom Browser ab. Tippen und Kartenlernen funktionieren auch ohne diese Schnittstellen.

## Quellen und Abdeckung

[Zuordnung aller Lernziele und sichtbaren Aufgaben](docs/ABDECKUNG.md) · [Prüfbericht](docs/PRUEFBERICHT.md)

Die PDF enthält fotografierte Bildschirmausschnitte. Nicht sichtbare Fortsetzungen und nur verlinkte Unterlagen werden nicht als geprüft ausgegeben. Die Originalfotos sind nicht im öffentlichen Repository enthalten. Die Antworten sind eigenständig formuliert; die drei SVG-Lernskizzen sind neu erstellt.

## Entwicklung

Statische Anwendung ohne Produktionsabhängigkeiten. `index.html` kann lokal geöffnet werden; für Mikrofon und dauerhaftes Speichern ist HTTPS oder localhost vorzuziehen. GitHub Actions veröffentlicht nur die in `scripts/build-static.cjs` aufgelisteten Webdateien.

```sh
npm test
npm run sync   # nach Änderungen an cards.json
npm run build
```

Browserprüfungen benötigen Playwright und Chrome. Optional `NODE_PATH` auf die vorhandenen Module sowie `CHROME_EXECUTABLE` auf Chrome setzen:

```sh
node tests/browser.cjs
node tests/speech-browser.cjs
node tests/oral-browser.cjs
node tests/backup-browser.cjs
```

Redaktionelle Daten: `cards.json`. Browserfassung: `data.js`. Wortschatz: `concepts.js`. Die bestehenden Karten-IDs bleiben bei Erweiterungen stabil, damit gespeicherte Lernstände erhalten bleiben.
