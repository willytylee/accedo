<?php
class history_model extends CI_Model
{   
    function __construct() {
        parent::__construct();
    }
    
    //---------------------------------------------------------------------
    
    public function insert_new_history($data) {
        $this->db->insert('history', $data);
    }
    
    //---------------------------------------------------------------------
    
    public function get_history_list() {
        $query = $this->db->get('history');
        return $query->result();
    }

    public function check_duplicate_insert($movie_id){
        $this->db->from('history');
        $this->db->where('movie_id',$movie_id);
        
        $query = $this->db->get();   //it return an object
        
        if ($query->num_rows() > 0){
            return true;
        }
        return false;
    }

    public function clear_all(){
        $this->db->empty_table('history');
    }
}
?>
