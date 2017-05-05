package ml.testsite_vic.ICC;

import javax.swing.JFrame;
import javax.swing.JLabel;

import java.awt.BorderLayout;
import java.awt.Color;

import javax.swing.BoxLayout;
import javax.swing.SwingConstants;
import javax.swing.JFileChooser;
import javax.swing.JPanel;
import javax.swing.JButton;
import javax.swing.AbstractAction;

import java.awt.event.ActionEvent;
import java.io.File;

import javax.swing.Action;

import java.awt.Font;

import javax.swing.JSplitPane;
import javax.swing.JTextField;

public class GUI {

	JPanel panel;
	public static JFrame frame;
	private final Action openFileBrowser = new SwingAction();
	private JTextField searchColor;
	private JTextField toColor;

	/**
	 * Create the application.
	 */
	public GUI() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame("ICC");
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		JLabel lblImageColorConverter = new JLabel("Image Color Converter");
		lblImageColorConverter.setFont(new Font("Tahoma", Font.PLAIN, 20));
		lblImageColorConverter.setHorizontalAlignment(SwingConstants.CENTER);
		frame.getContentPane().add(lblImageColorConverter, BorderLayout.NORTH);
		
		panel = new JPanel();
		frame.getContentPane().add(panel, BorderLayout.CENTER);
		
		JButton btnOpenFile = new JButton("Open file");
		btnOpenFile.setAction(openFileBrowser);
		panel.add(btnOpenFile);
		
		JPanel panel_1 = new JPanel();
		panel.add(panel_1);
		
		JSplitPane splitPane = new JSplitPane();
		panel_1.add(splitPane);
		
		JPanel panel_2 = new JPanel();
		splitPane.setLeftComponent(panel_2);
		
		JLabel lblSearchColor = new JLabel("Search color");
		panel_2.add(lblSearchColor);
		
		searchColor = new JTextField();
		searchColor.setText("#0000FF");
		panel_2.add(searchColor);
		searchColor.setColumns(10);
		
		JPanel panel_3 = new JPanel();
		splitPane.setRightComponent(panel_3);
		
		JLabel lblToColor = new JLabel("To color");
		panel_3.add(lblToColor);
		
		toColor = new JTextField();
		toColor.setText("#FF00FF");
		panel_3.add(toColor);
		toColor.setColumns(10);
	}

	private class SwingAction extends AbstractAction {
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		public SwingAction() {
			putValue(NAME, "Open folder");
			putValue(SHORT_DESCRIPTION, "Opens the folder browser");
		}

		public void actionPerformed(ActionEvent e) {
			String sCol = Main.isColor(searchColor.getText());
			String tCol = Main.isColor(toColor.getText());
			
			if (sCol != "" && tCol != "") {
				try {
					JFileChooser fileChooser = new JFileChooser();
					fileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
					fileChooser.setAcceptAllFileFilterUsed(false);
					
					if (fileChooser.showOpenDialog(frame) == JFileChooser.APPROVE_OPTION) {
//						System.out.println("getCurrentDirectory(): "
//								+ fileChooser.getCurrentDirectory());
//						System.out.println("getSelectedFolder : "
//								+ );
						
						File selectedFolder = fileChooser.getSelectedFile();
						JLabel openFolder = new JLabel("Working in: " + selectedFolder.toString());
						
						panel.removeAll();
						panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
						panel.add(openFolder);
						panel.setBounds(100, 100, 450, 300);
						
						Color searchCol = new Color(
					            Integer.valueOf(sCol.substring(0, 2), 16),
					            Integer.valueOf(sCol.substring(2, 4), 16),
					            Integer.valueOf(sCol.substring(4, 6), 16));
						
						Color toCol = new Color(
					            Integer.valueOf(tCol.substring(0, 2), 16),
					            Integer.valueOf(tCol.substring(2, 4), 16),
					            Integer.valueOf(tCol.substring(4, 6), 16));
						
						new ProcessFiles(selectedFolder, panel, searchCol, toCol);
					} else {
						System.out.println("No Selection ");
					}
				} catch (Exception e1) {
					Message.alert(frame, "Something went wrong", "Error");
					e1.printStackTrace();
				}
			} else {
				Message.alert(frame, "One or both of the given values are not colors", "Error");
			}
		}
	}

}
