<?php

$pageName = "Admin felület";

require_once "public/components/navbar.php";

require_once "public/components/head.php";

?>
<div class="row">
    <div class="col-12">
        <div id="display-courses"></div>
        <?php
        require_once "public/components/add-course.html"
        ?>
    </div>
</div>

<?php require_once("public/components/footer.php"); ?>
