boolean backg = false;
ArrayList<Particle> particles = new ArrayList();

void setup() {
  size(5000, 1000);

  for (int i = 0; i < width; i++) {
    particles.add(new Particle(width / 2, height / 2, randomColor(), (int) map(i, 0, 100, 5, 10)));
  }
  
  print("Loaded");
}

void draw() {
  if (backg) background(200);
  for (Particle p : particles) {
    p.update();
    p.edges();
    p.show();
  }
}

void mousePressed() {
  backg = !backg;
  
  for (Particle p : particles) {
    p.col = randomColor();
  }
}

color randomColor() {
  int r = floor(random(0, 255));
  int g = floor(random(0, 255));
  int b = floor(random(0, 255));

  return color(r, g, b);
}