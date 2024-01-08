import sys, pytesseract, PIL, pynput, time, math, pyautogui, random
from math import sqrt
from PIL import Image, ImageGrab
from pynput.keyboard import Key, Controller
from pynput import mouse, keyboard

use_grab = True
# Import ImageGrab if possible, might fail on Linux

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def screenGrab( rect ):
    """ Given a rectangle, return a PIL Image of that part of the screen.
        Handles a Linux installation with and older Pillow by falling-back
        to using XLib """
    global use_grab
    x, y, width, height = rect

    if ( use_grab ):
        image = ImageGrab.grab( bbox=(x, y, x+width, y+height) )
    return image

keyboard2 = Controller()
### Do some rudimentary command line argument handling
### So the user can speicify the area of the screen to watch
if ( __name__ == "__main__" ):
    EXE = sys.argv[0]
    del( sys.argv[0] )
    # -1250, 433, -670, 525
    # 580, 92
    # 750, 310, 550, 80
    # 150, 270, 1500, 54
    # Point(x=681, y=451)

    if ( len( sys.argv ) != 4 or sys.argv[0] in ( '--help', '-h', '-?', '/?' ) ):  # some minor help
        sys.stderr.write( EXE + ": monitors section of screen for text\n" )
        sys.stderr.write( EXE + ": Give x, y, width, height as arguments\n" )
        sys.exit( 1 )

    # TODO - add error checking
    x      = int( sys.argv[0] )
    y      = int( sys.argv[1] )
    width  = int( sys.argv[2] )
    height = int( sys.argv[3] )

    # Area of screen to monitor
    screen_rect = [ x, y, width, height ]  
    print( EXE + ": watching " + str( screen_rect ) )
    ### Loop forever, monitoring the user-specified rectangle of the screen
    def on_click(x, y, button, pressed):
        if pressed:
            print(pyautogui.position())
    global sugma
    sugma = True
    global pause
    pause = True
    def on_press(key):
        if key == Key.esc:
            global sugma
            sugma = False
        if key == Key.media_play_pause:
            global pause
            pause^=True
    listener = mouse.Listener(on_click=on_click)
    listener.start()
    keyListener = keyboard.Listener(on_press=on_press)
    keyListener.start()
    while (sugma):
        if pause: continue
        image = screenGrab( screen_rect )              # Grab the area of the screen
        text  = pytesseract.image_to_string( image )   # OCR the image
        # IF the OCR found anything, write it to stdout.
        text: str = text.strip()
        print(text)
        if (len(text) > 0 and sugma):
            try:
                # print(text)
                # text = text.replace("V", "sqrt(")
                # if text.startswith("sqrt"): text += ")"
                # print(text)
                # (keyboard.type(str(int(eval(text)))))
                # print(text, eval(text), int(eval(text)))
                # keyboard.tap(Key.enter)
                # time.sleep(0.5)
                text = text.replace("_", " ")
                text = text.replace("‘", "'")
                text = text.replace("’", "'")
                text = text.replace("8", ["8", "0"][random.randint(0, 1)])
                (keyboard2.type(text))
                keyboard2.press(Key.ctrl)
                keyboard2.tap("a")
                keyboard2.release(Key.ctrl)
                keyboard2.tap(Key.backspace)
                print(text)
                time.sleep(0.1)
            except: e = 1
            