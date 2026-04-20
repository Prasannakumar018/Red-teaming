![](../Random/Pasted%20image%2020250716140502.png): hackinghub


# 1) RemoteBinge
    In this room, we will be finding the vuln used **magic bytes**.  


**Magic bytes** (also called **file signatures**) :

| File Type                   | Magic Bytes (Hex)                          | Description                 |
| --------------------------- | ------------------------------------------ | --------------------------- |
| **JPEG**                    | `FF D8 FF`                                 | Start of Image (SOI) marker |
| **PNG**                     | `89 50 4E 47 0D 0A 1A 0A`                  | PNG file signature          |
| **GIF**                     | `47 49 46 38 37 61` or `47 49 46 38 39 61` | "GIF87a" or "GIF89a"        |
| **PDF**                     | `25 50 44 46`                              | `%PDF`                      |
| **ZIP**                     | `50 4B 03 04`                              | Standard ZIP file           |
| **RAR**                     | `52 61 72 21 1A 07 00`                     | RAR archive                 |
| **7z**                      | `37 7A BC AF 27 1C`                        | 7-Zip file                  |
| **EXE** (Windows)           | `4D 5A`                                    | "MZ" (DOS header)           |
| **MP3**                     | `FF FB` (often)                            | MPEG Layer III audio        |
| **ELF** (Linux Executables) | `7F 45 4C 46`                              | `0x7F` + "ELF"              |
