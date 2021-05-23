package kz.crtr.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Table
@Data
@Entity
public class User implements Serializable {
    @Id
    private Long id;
    private String userName;
}
