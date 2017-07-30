using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace LsCommand
{
				class Program
				{
								static void Main(string[] args)
								{
												string dirName = System.IO.Directory.GetCurrentDirectory();
												string argsContainsPath = arrayContainsPath(args);

												if (argsContainsPath.Length > 0)
												{
																dirName = argsContainsPath;
												}

												if (arrayRegExCompare(args, new Regex(@"\/(h(elp)?)", RegexOptions.IgnoreCase | RegexOptions.ECMAScript)))
												{
																LOG("/f, /fullPath\t\t- Displays full path");
																LOG("/a, /align\t\t- Displays every item on a new line");
																LOG("/b, /basic\t\t- Only different colors for dirs and files");
																LOG("/h, /help\t\t- This message");
												}
												else
												{
																String[] entries = System.IO.Directory.GetFileSystemEntries(dirName);

																foreach (string s in entries)
																{
																				System.IO.FileInfo fi = null;
																				try
																				{
																								fi = new System.IO.FileInfo(s);
																				}
																				catch (System.IO.FileNotFoundException e)
																				{
																								LOG(e.Message);
																				}

																				string name = fi.Name;
																				string appendToEnd = "\t";

																				if (arrayRegExCompare(args, new Regex(@"\/(a(lign)?)", RegexOptions.IgnoreCase | RegexOptions.ECMAScript)))
																								appendToEnd = "\n";

																				if (arrayRegExCompare(args, new Regex(@"\/(f(ullPath)?)", RegexOptions.IgnoreCase | RegexOptions.ECMAScript)))
																				{
																								name = fi.FullName;
																								appendToEnd = "\n";
																				}

																				if (arrayRegExCompare(args, new Regex(@"\/(b(asic)?)", RegexOptions.IgnoreCase | RegexOptions.ECMAScript)))
																				{
																								if (fi.Attributes.HasFlag(FileAttributes.Directory))
																								{
																												Console.ForegroundColor = ConsoleColor.Blue;
																												Console.Write(name + appendToEnd);
																												Console.ResetColor();
																								}
																								else
																								{
																												Console.ForegroundColor = ConsoleColor.Green;
																												Console.Write(name + appendToEnd);
																												Console.ResetColor();
																								}
																				}
																				else
																								logType(fi.Attributes, name, appendToEnd);
																}

																Console.WriteLine("");
												}
								}

								static bool arrayRegExCompare(string[] arr, Regex regEx)
								{
												foreach (string s in arr)
												{
																if (regEx.IsMatch(s)) return true;
												}

												return false;
								}

								static string arrayContainsPath(string[] arr)
								{
												foreach (string s in arr)
												{
																if (System.IO.Directory.Exists(s)) return s;
												}

												return "";
								}

								static void logType(System.IO.FileAttributes attributes, string fn, string addToEnd)
								{
												string att = attributes.ToString();

												if (att.Contains(',')) att = att.Split(',')[0];

												switch (att)
												{
																case "Archive":
																				Console.ForegroundColor = ConsoleColor.DarkGreen;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Compressed":
																				Console.ForegroundColor = ConsoleColor.Cyan;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Device":
																				Console.BackgroundColor = ConsoleColor.Black;
																				Console.ForegroundColor = ConsoleColor.Yellow;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Directory":
																				Console.ForegroundColor = ConsoleColor.Blue;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Encrypted":
																				Console.BackgroundColor = ConsoleColor.Red;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "IntegrityStream":
																				Console.ForegroundColor = ConsoleColor.Blue;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Hidden":
																				Console.ForegroundColor = ConsoleColor.DarkMagenta;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Normal":
																				Console.ForegroundColor = ConsoleColor.Green;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "NoScrubData":
																				Console.BackgroundColor = ConsoleColor.Gray;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "NotContentIndexed":
																				Console.BackgroundColor = ConsoleColor.DarkRed;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Offline":
																				Console.ForegroundColor = ConsoleColor.DarkRed;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "ReadOnly":
																				Console.ForegroundColor = ConsoleColor.DarkCyan;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "ReparsePoint":
																				Console.BackgroundColor = ConsoleColor.DarkCyan;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "SparseFile":
																				Console.BackgroundColor = ConsoleColor.DarkYellow;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "System":
																				Console.BackgroundColor = ConsoleColor.DarkBlue;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																case "Temporary":
																				Console.ForegroundColor = ConsoleColor.Gray;
																				Console.BackgroundColor = ConsoleColor.White;
																				Console.Write(fn + addToEnd);
																				Console.ResetColor();
																				break;
																default:
																				Console.Write(fn + addToEnd);
																				break;
												}
								}

								static string arrayToString(String[] arr)
								{
												string outp = "[";

												foreach(string s in arr)
												{
																outp += "\t" + s + ",\n";
												}

												return outp + "]";
								}

								static void LOG<T>(T args)
								{
												System.Console.WriteLine(args);
								}
				}
}
