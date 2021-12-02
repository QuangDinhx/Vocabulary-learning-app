using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace Quizlet_Fake.Tags
{
   public class Tag: AuditedAggregateRoot<Guid>
    {
        [Required]
        public int TagId { get; set; }
        [Required]
        public String Name { get; set; }
    }
}
