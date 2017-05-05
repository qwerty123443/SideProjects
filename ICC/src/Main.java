package ml.testsite_vic.ICC;

import java.awt.EventQueue;

public class Main {

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			@SuppressWarnings("static-access")
			public void run() {
				try {
					GUI window = new GUI();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	public static String isColor(String str) {
		if (str.startsWith("#")) {
			str = str.substring(1);
			if (str.length() == 6)
				return str;
			else
				return "";
		}
		return "";
	}
}