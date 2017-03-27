import processing.video.*;

Capture cam;
ArrayList<Particle> particles = new ArrayList();

int scale = 10;
color col = color(100, 200, 250);

float wantRed = 13;
float wantBlue = 67;
float wantGreen = 210;

void setup() {
  size(640, 480);

  String[] cameras = Capture.list();

  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    cam = new Capture(this, cameras[0]);
    cam.start();
  }
}

void draw() {
  if (cam.available() == true) {
    cam.read();
  }

  image(cam, 0, 0);
  text(scale, 0, 0);
  loadPixels();

  for (int i = 0; i < pixels.length; i++) {
    float r = red(pixels[i]);
    float g = green(pixels[i]);
    float b = blue(pixels[i]);

    if (between(wantRed + scale, wantRed - scale, r) && between(wantGreen + scale, wantGreen - scale, g) && between(wantBlue + scale, wantBlue - scale, b)) {
      pixels[i] = col;

      int x = i % width;
      int y = (i - x) / width;

      //particles.get(i).pos.x = x;
      //particles.get(i).pos.y = y;
      
      particles.add(new Particle(x, y, randomColor()));
    }
  }

  updatePixels();

  for (int i = 0; i < particles.size(); i++) {
    if (particles.get(i).life <= 0) {
      particles.remove(i);
    } else if (particles.get(i).edges()) {
      particles.remove(i);
    } else {
      particles.get(i).update();
      particles.get(i).show();
    }
  }
}

color randomColor() {
  int r = floor(random(0, 255));
  int g = floor(random(0, 255));
  int b = floor(random(0, 255));
  
  return color(r, g, b);
}

void mousePressed() {
  int pixel = pixels[cam.width * mouseY + mouseX];

  wantRed = red(pixel);
  wantBlue = blue(pixel);
  wantGreen = green(pixel);

  println(wantRed, wantGreen, wantBlue);
}

void keyPressed() {
  if (keyCode == UP) {
    scale++;
  } else if (keyCode == DOWN) {
    scale--;
  }
  
  println(scale);
}

//Let user click on white and calibirate the color vals
//void calibirate() {

//}

boolean between(float a, float b, float c) {
  return b > a ? c > a && c < b : c > b && c < a;
}