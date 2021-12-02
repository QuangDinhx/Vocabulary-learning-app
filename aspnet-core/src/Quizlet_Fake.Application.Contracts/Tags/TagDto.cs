using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Quizlet_Fake.Tags
{

        public class TagDto : AuditedEntityDto<Guid>
        {
            public int TagId { get; set; }
            public String Name { get; set; }
        }
    
}
