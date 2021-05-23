package kz.crtr.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Data
@Table
@Entity
public class Systems implements Serializable {
    @Id
    private Long id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "create_by", referencedColumnName = "id")
    private User createBy;
    private ZonedDateTime createDate;
    @ManyToOne
    @JoinColumn(name = "modify_by", referencedColumnName = "id")
    private User modifyBy;
    private ZonedDateTime modifyDate;
    /**
     * Флаг удаления
     */
    @Column(columnDefinition = "boolean default false")
    private Boolean deleted;
}
