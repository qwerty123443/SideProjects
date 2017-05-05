package ml.testsite_vic.ICC;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.text.AttributeSet;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyleContext;

import org.json.simple.JSONObject;

public class ProcessFiles {
	
	public int finished = 0;
	
	JLabel file = new JLabel("");
	JLabel percent = new JLabel("0%");
	JLabel fileCount = new JLabel("0 of 0 files processed");
	JProgressBar progressBar = new JProgressBar();
	JTextPane textPane = new JTextPane();
	JScrollPane logScroll = new JScrollPane(textPane);
	
	public enum LogType {DEFAULT, ERROR, WARN}
	
	@SuppressWarnings("unchecked")
	public ProcessFiles(File folder, JPanel panel, Color sCol, Color tCol) {
		int panelWidth = panel.getSize().width;
		
		textPane.setEditable(false);
		progressBar.setMinimum(0);
		progressBar.setMaximum(100);
		progressBar.setMaximumSize(new Dimension(panelWidth - panelWidth / 4, 20));
		
		panel.add(file);
		panel.add(fileCount);
		panel.add(progressBar);
		panel.add(percent);
		panel.add(logScroll);
		panel.revalidate();
		
		ArrayList<JSONObject> images = new ArrayList<>();
		for (final File fileEntry : folder.listFiles()) {
			if (!fileEntry.isDirectory()) {
				try {
					String mimetype = Files.probeContentType(fileEntry.toPath());
					String[] arr = mimetype.split("/");
					if (mimetype != null) {
						String type = arr[0].toLowerCase();
						String kind = arr[1].toLowerCase();
						if (type.equals("image")) {
							JSONObject json = new JSONObject();
							json.put("file", fileEntry);
							json.put("mimetype", mimetype);
							json.put("kind", kind);
							images.add(json);
						}
					}
				} catch (IOException e) {
					appendToPane(textPane, "Couldn't read mimetype: " + e.toString(), LogType.ERROR);
					e.printStackTrace();
				}
			}
		}
		
		if (!images.isEmpty())
			try {
				Thread thread = new Thread(new Process(images, sCol, tCol));
				thread.start();
			} catch (Exception e) {
				appendToPane(textPane, "There was an error with starting the new thread: " + e.toString(), LogType.ERROR);
				e.printStackTrace();
			}
		else {
			Message.alert(GUI.frame, "No images found", "Error");
    		System.exit(0);
		}
	}
	
	private class Process implements Runnable {
		
		Color sCol;
		Color tCol;
		ArrayList<JSONObject> files;
		
		Process(ArrayList<JSONObject> files, Color sCol, Color tCol) {
			this.sCol = sCol;
			this.tCol = tCol;
			this.files = files;
		}

		@Override
		public void run() {
			int maxFiles = files.size();
			
			appendToPane(textPane, "Started", LogType.DEFAULT);
			
	    	for (int i = 0; i < maxFiles; i++) {
	    		JSONObject obj = files.get(i);
	    		File fileEntry = (File) obj.get("file");
	    		
	    		appendToPane(textPane, "Processing: " + fileEntry.getName(), LogType.DEFAULT);
	    		
	    		/*	Algorithm	*/
	    		try {
					BufferedImage img = ImageIO.read(fileEntry);
					
					for (int y = 0; y < img.getHeight(); y++) {
						for (int x = 0; x < img.getWidth(); x++) {
							int clr = img.getRGB(x, y);
							int r = (clr & 0x00ff0000) >> 16;
							int g = (clr & 0x0000ff00) >> 8;
	    					int b =  clr & 0x000000ff;
	    					
	    					if (r == sCol.getRed() && g == sCol.getGreen() && b == sCol.getBlue())
	    						img.setRGB(x, y, tCol.getRGB());
						}
						
						ImageIO.write(img, obj.get("kind").toString(), fileEntry);
					}
					
					appendToPane(textPane, "Updated: " + fileEntry.getName(), LogType.DEFAULT);
				} catch (IOException e) {
					appendToPane(textPane, "There was an error with reading the image", LogType.ERROR);
					e.printStackTrace();
				}
	    		/*				*/
		        
		        finished++;
		        
		        float percentFinished = finished / maxFiles * 100;
		        progressBar.setValue((int) percentFinished);
	        	file.setText(fileEntry.getAbsolutePath());
	        	fileCount.setText("File " + Integer.toString(finished) + " of " + Integer.toString(maxFiles));
	        	percent.setText(Integer.toString((int) percentFinished) + "%");
		    }
	    	
	    	if (finished == maxFiles) {
	    		appendToPane(textPane, "Finished", LogType.DEFAULT);
	    		Message.alert(GUI.frame, "Everything is done", "Finished");
	    	} else {
	    		appendToPane(textPane, "Something went wrong: The total number of files (" + Integer.toString(maxFiles) + ") isn't the same as the recorded amount (" + Integer.toString(finished) + ").", LogType.ERROR);
	    		Message.alert(GUI.frame, "Errorcode 1", "Something went wrong");
	    	}
		}		
	}
	
	private void appendToPane(JTextPane tp, String msg, LogType type) {
		msg += "\n";
		Color c = Color.BLACK;
		
		switch (type) {
		case DEFAULT:
			c = Color.BLACK;
			break;
		case ERROR:
			c = Color.RED;
			break;
		case WARN:
			c = Color.ORANGE;
			break;
		default:
			c = Color.BLACK;
			break;
		}
		
        StyleContext sc = StyleContext.getDefaultStyleContext();
        AttributeSet aset = sc.addAttribute(SimpleAttributeSet.EMPTY, StyleConstants.Foreground, c);

        aset = sc.addAttribute(aset, StyleConstants.FontFamily, "Lucida Console");
        aset = sc.addAttribute(aset, StyleConstants.Alignment, StyleConstants.ALIGN_JUSTIFIED);

        tp.setEditable(true);
        int len = tp.getDocument().getLength();
        tp.setCaretPosition(len);
        tp.setCharacterAttributes(aset, false);
        tp.replaceSelection(msg);
        textPane.setEditable(false);
    }
}