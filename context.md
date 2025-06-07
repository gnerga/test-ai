<objective>
Dana jest mapa zbudowana z pól o wymiarze 4x4
Pola mapy ideksowane są od 1, a punkt startowy znajduje się w lewym górnym rogu.
Każde pole ma współrzędną x oraz y.
Pole startowe ma współrzędne x = 1 y = 1
wartości współrzędnych nie mogą być mniejsze od 1 oraz większe od 4.

Każde pole mapy przechowuje grafikę:

x:1 y:1 Ikonka lokalizacji
x:2 y:1 Trawa
x:3 y:1 Drzewo
x:4 y:1 Dom

x:2 y:2 Trawa
x:2 y:2 Wiatrak
x:2 y:2 Trawa
x:2 y:2 Trawa

x:1 y:3 Trawa
x:2 y:3 Trawa
x:3 y:3 Skały
x:4 y:3 Dwa drzewa

x:1 y:4 Góry
x:2 y:4 Zbocze górskie
x:3 y:4 Samochód
x:4 y:4 Jaskinia

Prompt otrzymuje instrukcję jak porusza się dron po mapie.
Na podstawie otrzymanej instrukcji, która będzie zawierała opis jak przemieszczać się po mapie zwróć zwięzły opis pola

Jeżeli dron wylatuje po za mapę czyli wartość kordynatów x lub y przyjmie wartość większą od 4 lub mniejszą od 1 to zwróć błąd

Przykładowa instrukcja
{

          "instruction": "tutaj instrukcja gdzie poleciał dron, np. poleciałem jedno pole w prawo"

 }

Jeśli instrukcja mówi poleciałem w lewo jedno pole to zmniejsz x o 1. 
Jeśli instrukcja mówi poleciałem w prawo o jedno pole to zwiększ x o 1.
Jeśli instrukcja mówi poleciałem w dół to zwiększ y o 1.
Jeśli instrukcja mówi poleciałem w górę o 1 to zmniejsz y o 1
Czyli przemieść się o zadana ilość pól w danym kierunku.
Pozycja początkowa to x: 1 y: 1
</objective>

W odpowiedzi zwróć plik json:
thinking proces: zawierajacy proces rozumowania llm
descripton: zwięzła odpoweidź na pytanie, maks 2 słowa
