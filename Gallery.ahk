Toggle := 0
Return

#MaxThreadsPerHotkey 2

F2::
    Toggle ^= 1
    While (Toggle)
    {
        if (!Toggle)
            Break
        Click, 350, 200
        Loop, 15
            Click, 1065, 365
        Click, 1500, 200
        MouseMove, 551, 447
        While(A_Cursor != "Unknown")
            Continue
        Click
        MouseMove, 777, 700
        While(A_Cursor != "Unknown")
            Continue
        Click
    }
Return

F3::
Loop
ToolTip % A_Cursor

Esc::ExitApp