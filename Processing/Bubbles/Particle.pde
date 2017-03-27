class Particle {
  int size;
  color col;
  PVector pos;
  PVector vel = PVector.random2D();
  PVector acc = new PVector();

  Particle(int x_, int y_, color col_, int size_) {
    col = col_;
    size = size_;
    pos = new PVector(x_, y_);
  }
  
  void edges() {
    if (pos.x > width || pos.x < 0) { vel.mult(-1); acc.mult(0); }
    if (pos.y > height || pos.y < 0) { vel.mult(-1); acc.mult(0); }
  }
  
  void show() {
    fill(col);
    noStroke();
    ellipse(pos.x, pos.y, size, size);
  }
  
  void update() {
    //acc = PVector.random2D();
    vel.add(acc);
    pos.add(vel);
    //vel.limit(5);
  }
}