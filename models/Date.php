<?php

class Date {

    public $year;
    public $month;
    public $day;
    public $hour;
    public $minute;

    public function __construct($date){
        $date = explode(' ', $date);
        $ymd = explode('-', $date[0]);  //year, month, day
        $hms = explode(':', $date[1]);  //hour, minute, second
        
        $this->year = $ymd[0];
        $this->month = $ymd[1];
        $this->day = $ymd[2];
        $this->hour = $hms[0];
        $this->minute = $hms[1];
    }
}