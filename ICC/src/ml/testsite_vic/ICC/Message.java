package ml.testsite_vic.ICC;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class Message {

	public static void alert(JFrame jframe, String message, String title) {
		JOptionPane.showMessageDialog(jframe, message, title, JOptionPane.INFORMATION_MESSAGE);
	}
	
	public static int confirm(JFrame jframe, String message, String title) {
		return JOptionPane.showConfirmDialog(jframe, message, title, JOptionPane.INFORMATION_MESSAGE);
	}
	
	public static String prompt(JFrame jframe, String message, String title) {
		return JOptionPane.showInputDialog(jframe, message, title, JOptionPane.INFORMATION_MESSAGE);
	}
}