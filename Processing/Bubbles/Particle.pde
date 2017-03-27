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
    
    //vel.mult(5);
  }
  
  void edges() {
    if (pos.x > width || pos.x < 0) { vel.mult(-1); acc.mult(0); changeCol(); }
    if (pos.y > height || pos.y < 0) { vel.mult(-1); acc.mult(0); changeCol(); }
    
    if (pos.x == width / 2 && pos.y == height / 2) changeCol();
  }
  
  void show() {
    //fill(col);
    //noStroke();
    noFill();
    strokeWeight(2);
    stroke(col);
    ellipse(pos.x, pos.y, size, size);
  }
  
  void update() {
    acc = PVector.random2D();
    vel.add(acc);
    pos.add(vel);
    vel.limit(5);
  }
  
  void changeCol() {
    if (col == color(255, 0, 0)) col = color(0, 255, 0);
    else if (col == color(0, 255, 0)) col = color(255, 0, 0);
    //else print("Nope");
  }
}