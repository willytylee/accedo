<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class History extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

    public function __construct() {
        parent::__construct();
        $this->load->model('history_model');
    }
    
    public function create() {
        $data['movie_id'] = $this->input->post('movie_id');
        $duplicate_insert = $this->history_model->check_duplicate_insert($data['movie_id']);
        if ($duplicate_insert == false) {
            $this->history_model->insert_new_history($data);
            $response = array('status' => 'success');
            $this->output->set_content_type("application/json")->set_output(json_encode($response));
        }
    }

    public function clear_all(){
        $response = $this->history_model->clear_all();    
    }

    public function get_history_list() {
        $response = $this->history_model->get_history_list();    
        $this->output->set_content_type('application/json')->set_output(json_encode($response));
    }
}
