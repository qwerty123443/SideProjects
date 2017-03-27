class Particle {
  color mainCol;
  
  int life = 10;
  
  PVector pos;
  PVector vel = new PVector();
  PVector acc = new PVector(0, -2);
  
  Particle(int x, int y, color col) {
    mainCol = col;
    pos = new PVector(x, y);
  }
  
  void show() {
    noStroke();
    fill(mainCol);
    float size = map(life, 0, 10, 0, 10);
    ellipse(pos.x, pos.y, size, size);
  }
  
  void update() {
    life--;
    vel.add(acc);
    pos.add(vel);
  }
  
  boolean edges() {
    if (pos.x > width || pos.x < 0) return true;
    if (pos.y > height || pos.y < 0) return true;
    return false;
  }
}