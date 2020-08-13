<?php 

function generateToken() {
  $s = '';
  for ($i=1; $i<=16; $i++) {
    $s .= chr(rand(65,90));
  }
  return $s;
}

?>