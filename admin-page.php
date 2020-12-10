<?php

$pageName = "Admin felület";

require_once "public/components/navbar.php";

require_once "public/components/head.php";

?>
<div class="row">
    <div class="col-12">
        <table id="courses" class="table table-striped text-center">
            <tr>
                <td> Kurzus neve</td>
                <td> Kurzuskód</td>
                <td> Kreditszám</td>
                <td> Max . létszám</td>
                <td> Oktató neve</td>
                <td> Típus</td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <?php require_once "public/components/add-course.html" ?>
    </div>
</div>

<?php require_once("public/components/footer.php"); ?>
