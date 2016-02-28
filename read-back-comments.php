<?php

/**
*
* @link              http://jeffreydewit.com
* @since             1.0.0
* @package           Read_Back_Comments
*
* @wordpress-plugin
* Plugin Name:       Read Back Comments
* Plugin URI:        http://jeffreydewit.com/post-series-manager/
* Description:       A plugin that will read back your comment before posting it. See also: https://xkcd.com/481/
* Version:           1.0.0
* Author:            Jeffrey de Wit
* Author URI:        http://jeffreydewit.com/
* License:           GPL-2.0+
* License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
* Text Domain:       read-back-comments
* Domain Path:       /languages
*
*
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License, version 2, as 
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

class Read_Back_Comments {

    private $plugin_name;
    private $plugin_version;

    public function __construct() {
        $this->plugin_name = 'read-back-comments';
        $this->plugin_version = '1.0';

        add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_read_back_script' ) );
    }

    public function enqueue_read_back_script() {
        global $post;

        if ( comments_open( $post->ID ) ) {
            wp_enqueue_script( $this->plugin_name, 
                                plugin_dir_url( __FILE__ ) . 'js/read-back-comments.js',
                                array(),
                                $this->plugin_version,
                                true
                             );
        }
    }

}

$read_back_comments = new Read_Back_Comments();